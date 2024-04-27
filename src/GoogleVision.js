import { features } from "process"

const API_URL='https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD6aeBwDmxQGqbsApM3eefLn4mPyC7-eoA'

export const getTextFromImage = async(image) =>{
    const data = {
        requests: [
            {
                image: {
                    content: image,
                },
                features: [
                    {
                        type: 'TEXT_DETECTION',
                        maxResults: 1,
                    },
                ],
            },
        ],
    };

    const res = await fetch(API_URL, {
        method: "POST",
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const json = await res.json()
    return json
}