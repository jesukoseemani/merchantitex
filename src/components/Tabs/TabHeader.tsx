import { Link } from '@mui/material';
import React, { useState } from 'react'
import Styles from "./styles.module.scss"

interface HeaderTab {
    id: number;
    name: string;
    link?: string;
}

interface Props {
    updateTab: React.Dispatch<React.SetStateAction<number>>;
    routes: HeaderTab[];
}
const TabHeader = ({ updateTab, routes }: Props) => {
    const [activeTab, setActiveTab] = useState(1);

    const tabHandler = (id: number) => {
        setActiveTab(id);
        updateTab(id);
    };

    return (
        <div className={Styles.header__container}>
            <nav>
                <ul>
                    {routes?.map((route) => (
                        <li
                            key={route?.id}
                            onClick={() => tabHandler(route?.id)}
                            className={activeTab === route.id ? Styles.active : ""}
                        >
                            <Link href="#">{route?.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )

}

export default TabHeader