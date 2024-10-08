import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Experience({ backendApiUrl, language }) {
    const [items, setItems] = useState([]);

    const getExperience = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/experience/` + language);
            const newItems = response.data.map((item) => ({
                company: item.company,
                title: item.title,
                duration: item.duration,
                description: item.description,
                technologies: item.technologies,
                url: item.url
            }));
            setItems(newItems);
        } catch (error) {
            console.error('Error fetching experiences:', error);
        }
    };

    useEffect(() => {
        getExperience();
    }, [language]);

    const isSmallScreen = useMediaQuery('(max-width:1024px)');

    const getTitleLanguage = () => {
        switch (language) {
            case "FR":
                return "Mes Expériences";
            case "DE":
                return "Meine Erfahrungen";
            default:
                return "My Experiences";
        }
    };

    const TimelineItemContent = ({ company, title, duration, description, technologies, url }) => (
        <TimelineItem>
            {!isSmallScreen && (
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                >
                    <Typography>{company}</Typography>
                    <Typography color="text.secondary" variant="body2">{duration}</Typography>
                    {url && (
                        <Typography
                            color="text.secondary"
                            variant="body2"
                            mt={1}
                            style={{ cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}
                            onClick={() => window.open(url)}
                        >
                            {url}
                        </Typography>
                    )}
                </TimelineOppositeContent>
            )}
            <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot sx={{ backgroundColor: "#2563eb" }}>
                    <LaptopMacIcon />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '60px', px: 2 }}>
                {isSmallScreen && (
                    <div style={{ marginBottom: "10px" }}>
                        <Typography>{company}</Typography>
                        <Typography color="text.secondary" variant="body2">{duration}</Typography>
                        {url && (
                            <Typography
                                color="text.secondary"
                                variant="body2"
                                mt={1}
                                style={{ cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}
                                onClick={() => window.open(url)}
                            >
                                {url}
                            </Typography>
                        )}
                    </div>
                )}
                <Typography sx={{ color: "#2563eb" }} variant="h6">{title}</Typography>
                <Typography mt={1} sx={{ textAlign: "justify", textJustify: "inter-word" }}>{description}</Typography>
                <Typography mt={1} color="text.secondary" variant="body2">{technologies}</Typography>
            </TimelineContent>
        </TimelineItem>
    );

    return (
        items.length > 0 && <div name="experience" className="gradient-bg-left py-24">
            <div className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 mx-auto w-max">
                <div className="bprimary mx-auto w-28 h-1.5 rounded mb-3" />
                <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl tblack3">{getTitleLanguage()}</p>
            </div>
            <div className={"flex flex-col lg:flex-row mx-6 md:mx-20 lg:mx-16 xl:mx-32 2xl:mx-36"}>
                <Timeline
                    position={isSmallScreen ? 'right' : 'alternate'}
                    sx={isSmallScreen ? {
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 0,
                        },
                    } : {}}
                >
                    {items.map((item, index) => (
                        <TimelineItemContent
                            key={index}
                            company={item.company}
                            title={item.title}
                            duration={item.duration}
                            description={item.description}
                            technologies={item.technologies}
                            url={item.url}
                        />
                    ))}
                </Timeline>
            </div>
        </div>
    );
}