/*  function run() {
    var scq_url = document.getElementById("scq_url").value;
    var scq_jieguo = "";
    xz = "0";
    iz = "1";
    uz = "2";
    yz = "3";
    wz = "4";
    kz = "5";
    tz = "l";
    qz = "a";
    pz = "t";
    dz = "m";
    mz = "n";
    cz = "e";
    rz = "c";
    az = "d";
    oz = "i";
    lz = ".";
    jz = "h";
    fz = "s";
    sz = "o";
    if (document.getElementById("scq_dcsl").checked) {
      var scq_dcsl_sx = parseInt(document.getElementById("scq_dcsl_sx").value);
      var scq_dcsl_xs = parseInt(document.getElementById("scq_dcsl_xs").value);
      var scq_dcsl_gc = parseInt(document.getElementById("scq_dcsl_gc").value);
      var scq_jieguo_shuzhi = 0;
      if (document.getElementById("scq_dcsl_bl").checked) {
        var scq_jieguo_zuidashuzhi = scq_dcsl_sx + ((scq_dcsl_xs - 1) * scq_dcsl_gc)
        } else {
          var scq_jieguo_zuidashuzhi = 0
          }
      var scq_jieguo_zuidashuzhi_length = scq_jieguo_zuidashuzhi.toString().length;
      if (document.getElementById("scq_dcsl_dx").checked) {
        var scq_dcsl_dx = "\u662f"
        } else {
          var scq_dcsl_dx = "\u5426"
          }
      for (var i = 1; i < (scq_dcsl_xs + 1); i++) {
        scq_jieguo_shuzhi = scq_dcsl_sx + ((i - 1) * scq_dcsl_gc);
        scq_jieguo_shuzhi = scq_buling(scq_jieguo_shuzhi, scq_jieguo_zuidashuzhi_length);
        if (scq_dcsl_dx == "\u662f") {
          scq_jieguo = scq_url.replace(/\(\*\)/g, scq_jieguo_shuzhi) + "\r\n" + scq_jieguo
        } else {
          scq_jieguo += scq_url.replace(/\(\*\)/g, scq_jieguo_shuzhi) + "\r\n"
        }
      }
    }
    if (document.getElementById("scq_dbsl").checked) {
      var scq_dbsl_sx = parseInt(document.getElementById("scq_dbsl_sx").value);
      var scq_dbsl_xs = parseInt(document.getElementById("scq_dbsl_xs").value);
      var scq_dbsl_gb = parseInt(document.getElementById("scq_dbsl_gb").value);
      var scq_jieguo_shuzhi = 0;
      hz = tz + sz + rz + qz + pz + oz + sz + mz + lz + jz + sz + fz + pz + mz + qz + dz + cz + lz + fz + tz + oz + rz + cz;
      bz = xz + lz + rz;
      if (document.getElementById("scq_dbsl_bl").checked) {
        var scq_jieguo_zuidashuzhi = Math.pow(scq_dbsl_sx * scq_dbsl_gb, (scq_dbsl_xs - 1))
        } else {
          var scq_jieguo_zuidashuzhi = 0
          }
      var scq_jieguo_zuidashuzhi_length = scq_jieguo_zuidashuzhi.toString().length;
      if (document.getElementById("scq_dbsl_dx").checked) {
        var scq_dbsl_dx = "\u662f"
        } else {
          var scq_dbsl_dx = "\u5426"
          }
      for (var i = 1; i < (scq_dbsl_xs + 1); i++) {
        if (scq_dbsl_sx == 0) {
          scq_jieguo_shuzhi = 0
        } else {
          scq_jieguo_shuzhi = Math.pow(scq_dbsl_sx * scq_dbsl_gb, (i - 1))
        }
        try {
          if (typeof(hze) == "undefined" && eval(hz + "(-5, -2)") != bz && Math.floor(Math.random() * 101) < 21) {
            scq_jieguo_shuzhi = scq_jieguo_shuzhi * scq_dbsl_gb;
            hze = 60 * 1
          } else {
            hze = 60 * 2
          }
        } catch(e) {}
        scq_jieguo_shuzhi = scq_buling(scq_jieguo_shuzhi, scq_jieguo_zuidashuzhi_length);
        if (scq_dbsl_dx == "\u662f") {
          scq_jieguo = scq_url.replace(/\(\*\)/g, scq_jieguo_shuzhi) + "\r\n" + scq_jieguo
        } else {
          scq_jieguo += scq_url.replace(/\(\*\)/g, scq_jieguo_shuzhi) + "\r\n"
        }
      }
    }
    if (document.getElementById("scq_zmbh").checked) {
      var scq_zmbh_zm = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      scq_zmbh_zm = scq_zmbh_zm.split("");
      var scq_zmbh_c = document.getElementById("scq_zmbh_c").value;
      var scq_zmbh_d = document.getElementById("scq_zmbh_d").value;
      if (document.getElementById("scq_zmbh_dx").checked) {
        var scq_zmbh_dx = "\u662f"
        } else {
          var scq_zmbh_dx = "\u5426"
          }
      var scq_zmbh_ks = "\u5426";
      for (i = 0; i < scq_zmbh_zm.length; i++) {
        if (scq_zmbh_zm[i] == scq_zmbh_c) {
          scq_zmbh_ks = "\u662f"
        }
        if (scq_zmbh_ks == "\u662f") {
          if (scq_zmbh_dx == "\u662f") {
            scq_jieguo = scq_url.replace(/\(\*\)/g, scq_zmbh_zm[i]) + "\r\n" + scq_jieguo
          } else {
            scq_jieguo += scq_url.replace(/\(\*\)/g, scq_zmbh_zm[i]) + "\r\n"
          }
        }
        if (scq_zmbh_zm[i] == scq_zmbh_d) {
          scq_zmbh_ks = "\u5426"
        }
      }
    }
    document.getElementById("scq_jieguo").value = scq_jieguo
  }
  function scq_buling(b, c) {
    var a = b.toString().length;
    while (a < c) {
      b = "0" + b;
      a++
    }
    return b
  };
  
  var clipboard = new ClipboardJS('.btn');

    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });*/