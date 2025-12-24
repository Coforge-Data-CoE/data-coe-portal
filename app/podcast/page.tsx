"use client";
import React, { useState } from 'react';
import { PodcastCard } from '../components/PodcastCard';

const PodcastPage = () => {
  const podcasts = [
    {
      id: '1',
      title: 'Podcast Episode 1',
      author: 'Author 1',
      coverImage: 'https://www.worklikeamother.com/wp-content/uploads/2014/09/sortcode-03-500x500.jpg',
      audioUrl: '/path/to/audio1.mp3',
      description: 'Description of Podcast Episode 1',
      date: '2025-12-24',
      duration: 3600,
      transcript: [
        { time: 0, text: 'Welcome to the podcast.' },
        { time: 10, text: 'This is the first segment.' },
      ],
    },
    {
      id: '2',
      title: 'Podcast Episode 2',
      author: 'Author 2',
      coverImage: 'https://img.freepik.com/free-photo/designer-working-3d-model_23-2149371896.jpg?semt=ais_hybrid&w=740&q=80',
      audioUrl: '/path/to/audio2.mp3',
      description: 'Description of Podcast Episode 2',
      date: '2025-12-23',
      duration: 1800,
      transcript: [],
    },
    {
      id: '3',
      title: 'Podcast Episode 3',
      author: 'Author 3',
      coverImage: 'https://www.signaturepropertygroup.com/wp-content/uploads/2018/09/5V8A2916_5x7_vert-1-214x300.jpg',
      audioUrl: '/path/to/audio3.mp3',
      description: 'Description of Podcast Episode 3',
      date: '2025-12-22',
      duration: 2400,
      transcript: [],
    },
    {
      id: '4',
      title: 'Podcast Episode 4',
      author: 'Author 4',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwFm8HzufsuORVadCiqVv_fdNsu0ECmjZKYA&s',
      audioUrl: '/path/to/audio4.mp3',
      description: 'Description of Podcast Episode 4',
      date: '2025-12-21',
      duration: 3000,
      transcript: [],
    },
    {
      id: '5',
      title: 'Podcast Episode 5',
      author: 'Author 5',
      coverImage: 'https://media.istockphoto.com/id/1398385367/photo/happy-millennial-business-woman-in-glasses-posing-with-hands-folded.jpg?s=612x612&w=0&k=20&c=Wd2vTDd6tJ5SeEY-aw0WL0bew8TAkyUGVvNQRj3oJFw=',
      audioUrl: '/path/to/audio5.mp3',
      description: 'Description of Podcast Episode 5',
      date: '2025-12-20',
      duration: 2700,
      transcript: [],
    },
  ];

  const [currentPodcast, setCurrentPodcast] = useState(podcasts[0]);

  return (
    <div className="flex flex-row h-screen bg-gray-100">
              {/* Page Title */}
      {/* <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Podcast</h1> */}
      {/* Main Podcast Player */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-3/5 bg-white p-8 rounded-lg shadow-lg">
          {/* <img
            src={currentPodcast.coverImage}
            alt={currentPodcast.title}
            className="w-full h-64 object-cover rounded-t-lg mb-4"
          /> */}
          <div className=''>
          <PodcastCard podcast={currentPodcast} />
          </div>
        </div>
      </div>

      {/* Other Podcasts Panel */}
      <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
        <h2 className="text-gray-800 text-lg font-semibold mb-4">Other Podcasts</h2>
        <div className="space-y-4">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              onClick={() => setCurrentPodcast(podcast)}
              className={`bg-white p-4 rounded-lg flex items-center gap-4 hover:bg-gray-100 transition cursor-pointer ${
                podcast.id === currentPodcast.id ? 'border-2 border-blue-500' : ''
              }`}
            >
              <img
                src={podcast.coverImage}
                alt={podcast.title}
                className="w-16 h-16 object-cover rounded-full"
              />
              <div>
                <h3 className="text-gray-800 font-medium">{podcast.title}</h3>
                <p className="text-gray-600 text-sm">{podcast.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PodcastPage;