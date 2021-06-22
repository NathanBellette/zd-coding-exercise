import React from 'react';
import {BeatLoader} from "react-spinners";
import styles from "./Loading.module.scss";

export interface ComponentProps {
    loading: boolean;
}

const Loading: React.FC<ComponentProps> = ({loading}) => {
    return loading ? <div className={styles.loading}><BeatLoader color="#000000" loading={true} size={50} /></div> : null;
}

export default Loading;