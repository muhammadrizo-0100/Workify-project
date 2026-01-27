import { useState, useEffect } from 'react';

function Dashboard() {
    return(
    <div className='Dashbord' >
        <div>
            <div>
            <h1>Dashboard</h1>    
            </div> <button>Post a Job</button>
        </div>
        <div className='completed-views'>
            <div className="completed"></div>
            <div className='views'></div>
        </div>
        <div className="posts">
            
        </div>
    </div>
    )
}

export default Dashboard; 
