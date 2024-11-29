'use client'
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function NavBreadcrumbs() {
  return (
    <div onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Beacon
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/mentors"
        >
          Mentors
        </Link>
        
      </Breadcrumbs>
    </div>
  );
}