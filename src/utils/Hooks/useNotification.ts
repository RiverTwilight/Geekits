import { useEffect, useState } from "react";
import axios from "axios";

const API =
  "https://api.github.com/repos/RiverTwilight/ygktool/issues/21/comments?sort=created";

interface INotification {
  content: string;
  id: number;
  isRead: boolean;
  createDate: string;
}

function useNotifications(): [INotification[], (id: number) => void] {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get(API);
      const comments = response.data;
      const readedRecords = JSON.parse(
        localStorage.getItem("READED_NOTICES") || "[]"
      );

      const notifications = comments.map((comment) => ({
        content: comment.body,
        id: comment.id,
        isRead: readedRecords.includes(comment.id),
        createDate: comment.created_at,
      }));

      setNotifications(notifications);
    };

    fetchNotifications();
  }, []);

  const setRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );

    const readedRecord = JSON.parse(
      localStorage.getItem("READED_NOTICES") || "[]"
    );

    if (!readedRecord.includes(id)) {
      localStorage.setItem(
        "READED_NOTICES",
        JSON.stringify([...readedRecord, id])
      );
    }
  };

  return [notifications, setRead];
}

export default useNotifications;
