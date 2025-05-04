import React from 'react';
import { LinkForm } from '../components/LinkForm';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const LinkSubmissionPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl">
          <LinkForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};