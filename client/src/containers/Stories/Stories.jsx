import React, { useEffect, useState } from 'react'
import {getStory, topStories} from "../../api/apiCalls"
import Story from '../Story/Story';
import "./Stories.css"
import Navbar from "../../components/navbar/Navbar"
import {FidgetSpinner} from "react-loader-spinner"

export default function Stories() {

    const [storyIds, setStoryIds] = useState([]);
    const [stories, setStories] = useState([]);
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
      topStories().then(storyId=>storyId && setStoryIds(storyId));
    }, []);

    useEffect(() => {
      // Use Promise.all to wait for all stories to be fetched
      setIsLoading(true);
      Promise.all(
        storyIds.map((storyId) => getStory(storyId).then((data) => data))
      ).then((fetchedStories) => {
        // Filter out stories without URL, descendants, and score
        const validStories = fetchedStories.filter(
          (data) => data && data.url && data.descendants && data.score
        );
  
        // Sort stories based on UNIX time (assuming UNIX time is in milliseconds)
        const sortedStories = validStories.sort(
          (a, b) => b.time - a.time
        );
        const top90Stories = sortedStories.slice(0, 90);
        const storiesWithReadStatus = top90Stories.map((story) => ({ ...story, read: false }));
        setStories(storiesWithReadStatus);
        setIsLoading(false);
      });
    }, [storyIds]);

    const handleDelete = (index) =>{
      const updatedStories = [...stories];
      updatedStories.splice(index,1);
      setStories(updatedStories);
    }

    const handleRead = (index) =>{
      const updatedStories = [...stories];
      updatedStories[index].read = !updatedStories[index].read;
      setStories(updatedStories);
    }
  
    return (
      <div className="stories-wrapper">
        <Navbar/>
        {loading ? (
          <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="fidget-spinner-loading"
            wrapperStyle={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            wrapperClass="fidget-spinner-wrapper"
          />
        ):(
          <div className='stories-container'>
            {stories.map((story,index)=>(
              <Story key={story.id} story={story} ind={index} onDelete={handleDelete} onMarkAsRead={handleRead}/>
            ))}
          </div>
        )}
      </div>
    )
}
