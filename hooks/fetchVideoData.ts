import { useState, useEffect } from 'react';

interface Phrase {
  sentence_id: string;
  text: string;
}

interface Caption {
  start_time: string;
  end_time: string;
  phrases: Phrase[];
  sequence_number: number;
}

interface TranscriptOrTranslate {
  video_id: string;
  language: string;
  captions: Caption[];
}

type DataType = 'Transcript' | 'Translate';

const useFetchVideoData = (type: DataType, id: string) => {
  const [data, setData] = useState<TranscriptOrTranslate | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let url = '';

      if (type === 'Transcript') {
        url = `/api/transcripts/${id}`;
      } else if (type === 'Translate') {
        url = `/api/translations/${id}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: TranscriptOrTranslate = await response.json();
        setData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  return { data, error, loading };
};

export default useFetchVideoData;
