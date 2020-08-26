// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-loadable` if it exis... Remove this comment to see the full error message
import Loadable from 'react-loadable'
import React from 'react'
import {
    HashRouter as Router,
    Route,
    Switch
} from "react-router-dom"

const LoadPage = (loader: any) => {
    return Loadable({
        loader:() => import( './page/' + loader),
        loading () {return(
            
            <div style={{display:'inline-block'}} className="mdui-color-green-100 mdui-progress loading">
                
                <div className="mdui-progress-indeterminate"></div>
            </div> 
        )}
    })
}

const UserRouterList = [{
    component:LoadPage('home.jsx'),
    path:"/",
    exact:true
},{
    component:LoadPage('sync.jsx'),
    path:"/sync",
    exact:true
},{
    component:LoadPage('rePwd.jsx'),
    path:"/rePwd",
    exact:true
},{
    component:LoadPage('reEmail.jsx'),
    path:"/reEmail",
    exact:true
}]

class Ui extends React.Component {
    constructor(props: any) {
        super(props);    
	}
    render(){
    	return (
            
            <>
                
                <Router>       
                    
                    <Switch>
                        {UserRouterList.map(route=>(
                            
                            <Route {...route}></Route>
                        ))}
                    </Switch>
                </Router>
            </>
		)
    }
}

export default Ui
