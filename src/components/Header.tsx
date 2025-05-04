import React from 'react';
import { Link2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center">
        <Link2 className="h-8 w-8 text-blue-600 mr-3" />
        <h1 className="text-xl font-semibold text-gray-800">Link Processor</h1>
      </div>
    </header>
  );
};