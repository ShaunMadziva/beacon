'use client'
import * as React from 'react';
import containers from '@/app/styles/containers.module.css';
import IntroBox from './components/home_boxes/IntroBox';
import NavBreadcrumbs from './components/NavBar';
import { Footer } from './components/footerComp';


export default function Homepage() {
    return (
        <>
        <header className='h-16 bg-amber-200'>
          <NavBreadcrumbs />
        </header>
          <main>
              <div className={containers.mainContainer}>
                <IntroBox />
              </div>
          </main>
          <footer>
            <Footer />
          </footer>
        </>
        
    )
}
