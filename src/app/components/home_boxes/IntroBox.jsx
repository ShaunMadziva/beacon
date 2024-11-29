'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Intro } from '@/app/library/introTxt';

export default function IntroBox() {

    return (
        <Paper
        elevation={24}
        sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: {
                xs: 'column',
            },
            margin: 1,
            padding: 2,
            // Responsive width:
            width: {
            xs: 'auto',
            
            },
            // Responsive height:
            height: {
            xs: 'auto',
            
            },
            borderRadius: '10px',
            fontFamily: 'platypi',
            // Responsive font size for the title:
            fontSize: {
            xs: 24,
            sm: 26,
            md: 30,
            },
            color: 'black',
            }}>
                Welcome to Beacon
    <div>
    <div>
    <Paper sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 3,
                marginBottom: {
                    xs: 1,
                },
                // Responsive gap:
                gap: {
                    xs: 1,
                    sm: 1.5,
                    md: 2,
                },
                width: {
                    xs: 260,
                    sm: 320,
                    md: 400,
                },
                background: 'none',
                boxShadow: 'none',
                color: 'rgb(var(--textColorLight))',
                fontSize: {
                    xs: 14,
                    sm: 15,
                    md: 16,
                },
                }}>
                <Intro />
            </Paper>
            </div>
            
        </div>
    </Paper>
)
}