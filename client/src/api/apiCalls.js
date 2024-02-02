import axios from "axios";

export const baseUrl = "https://hacky-news-server.vercel.app/"

export const topStories = async () => {
    const res = await axios.get(`${baseUrl}topstories.json`).then(({data})=>data)
    return res;
    
};
export const getStory = async (storyId) => {
    const res = await axios.get(`${baseUrl}item/${storyId}.json`).then(data=>data)
    return res.data;
};