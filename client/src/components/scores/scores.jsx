import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';

export default function ScoreCard() {
    const { loading, data } = useQuery(GET_ME);

    useEffect(() => {
        if (!loading) {
            document.querySelector('.ttt').innerHTML = data; 
        }
    }, [loading, data]);

    return (
        <>
            {loading ? (
                ''
            ) : (
                <div className="score-card">
                    <div className="card-score-positions">
                        <div className="score-card-score ttt"></div>
                    </div>
                    <div className="card-score-positions">
                        <div className="score-card-score"></div>
                    </div>
                    <div className="card-score-positions">
                        <div className="score-card-score"></div>
                    </div>
                </div>
            )}
        </>
    );
}