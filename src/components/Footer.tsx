import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-6">
      <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Link Processing App. All rights reserved.</p>
      </div>
    </footer>
  );
};