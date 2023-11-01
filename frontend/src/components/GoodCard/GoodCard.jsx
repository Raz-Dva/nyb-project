import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import './GoodCard.css';
import {Link} from "react-router-dom";

export const GoodCard = ({ good }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        async function fetchConfig() {
            try {
                const response = await fetch('/config.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch configuration');
                }
                const config = await response.json();

                // Configure AWS SDK with the credentials and region
                AWS.config.update({
                    accessKeyId: config.S3_KEY_ID,
                    secretAccessKey: config.S3_KEY_SECRET,
                    region: config.S3_REGION_NAME,
                });

                const s3 = new AWS.S3();
                const bucketName = 'nyb-basket';

                // Fetch the image from Amazon S3 based on the imageUrl from the good prop
                const s3Object = await s3.getObject({ Bucket: bucketName, Key: good.imageUrl }).promise();
                const imageUrl = URL.createObjectURL(new Blob([s3Object.Body]));
                setImageUrl(imageUrl);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchConfig();

    }, [good]);

    return (
        <div className="GoodCard">
            <div className="box-good_img overflow-hidden">
                {imageUrl ? (
                    <img src={imageUrl} alt="Boat" className="GoodCard__img" />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>
            <Link to={`/full-card/${good.id}`} className="GoodCard__name"> <h2>
                {good.make} {good.model} </h2>
            </Link>
            <div className="GoodCard__place"><h3>
                {good.country}, {good.state} | {good.year} </h3>
            </div>
            <div className="GoodCard__price"><h3>
                <b>€{good.price}</b></h3>
            </div>
        </div>
    );
};
