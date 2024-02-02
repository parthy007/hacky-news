import "./Story.css"
import React, { useEffect, useState } from 'react'
import { BiSolidUpvote } from "react-icons/bi";
import { MdOutlineComment } from "react-icons/md";
import { AiOutlineRead } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

export default function Story({story,ind,onDelete, onMarkAsRead}) {

    const [hoursAgo, setHoursAgo] = useState(null);

    useEffect(() => {
        const currentTime = new Date().getTime() / 1000; // Convert to seconds
        const storyTime = story.time;
        
        const timeDifferenceInSeconds = currentTime - storyTime;
        const timeDifferenceInHours = Math.floor(timeDifferenceInSeconds / 3600);

        setHoursAgo(timeDifferenceInHours);
    }, []);

    const handleDelete = () =>{
        onDelete(ind);
    }

    const handleMarkasRead = () =>{
        onMarkAsRead(ind);
    }

  return story.url && story.descendants && story.score ? (
    <div className={`story-wrapper ${story.read ? 'read':''}`}>   
        <div className='story-number'>{ind+1}</div>
        <div className="story-info-container">
            <div className="story-title">{story.title}</div>
            <div className="story-info">
                <span className="story-by">By: <span className="story-by-name">{story.by}</span></span>
                <span className="story-time">{hoursAgo !== null ? `${hoursAgo} hours ago` : 'Loading...'}</span>
                <a href={story.url} target="_blank" rel="noopener noreferrer" className="story-link">{story.url}</a>
                <span className="story-upvotes">
                    <BiSolidUpvote />
                    {story.score}
                </span>
                <span className="story-comments">
                    <MdOutlineComment />
                    {story.descendants}
                </span>
            </div>
        </div>   
        <div className="story-btn-container">
            <button title="Mark Read">
                <AiOutlineRead className="story-btn readbtn" onClick={handleMarkasRead}/>
            </button>
            <button title="Delete item">
                <MdDelete className="story-btn deletebtn" onClick={handleDelete}/>
            </button>
        </div>
    </div>
        
  ) : null;
}
