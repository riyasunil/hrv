"use client"
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Yogacard({ name, imageUrl, description }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={name}
                height="140"
                image={imageUrl}
            />
            <CardContent style={{ height: expanded ? 'auto' : '80px', overflow: 'hidden' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" onClick={toggleExpand}>
                    {expanded ? 'Show Less' : 'Learn More'}
                </Button>
            </CardActions>
        </Card>
    );
}
