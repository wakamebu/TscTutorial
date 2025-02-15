import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";

type Props = {
    initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    };

    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>他のにゃんこも見る</button>
            <div>{loading ? <p>Loading...</p> : <img src={imageUrl} className={styles.img} alt="Cat Image" />}</div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await response.json();
    return images[0];
};

export default IndexPage;
