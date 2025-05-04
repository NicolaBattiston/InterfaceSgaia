import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LinkIcon, Loader2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitLink } from '../lib/api';

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  error?: string;
  originalUrl: string;
  generatedUrl?: string;
}

export const LinkForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    originalUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.originalUrl.trim()) {
      setFormState(prev => ({
        ...prev,
        status: 'error',
        error: 'Please enter a valid URL',
      }));
      return;
    }

    try {
      setFormState(prev => ({ ...prev, status: 'submitting' }));
      
      const response = await submitLink(formState.originalUrl);
      
      setFormState({
        status: 'success',
        originalUrl: formState.originalUrl,
        generatedUrl: response.generatedUrl,
      });
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
    }
  };

  const resetForm = () => {
    setFormState({
      status: 'idle',
      originalUrl: '',
    });
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Link Processor</h2>
        
        {formState.status === 'success' ? (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-green-800 font-medium">Success!</p>
                <p className="text-green-700 text-sm mt-1">Your link has been processed successfully.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Original Link</p>
                <div className="bg-gray-50 p-3 rounded border border-gray-200 break-all">
                  {formState.originalUrl}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Generated Link</p>
                <div className="bg-blue-50 p-3 rounded border border-blue-200 break-all">
                  <a 
                    href={formState.generatedUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {formState.generatedUrl}
                  </a>
                </div>
              </div>
            </div>
            
            <button
              onClick={resetForm}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Process Another Link
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                Enter URL
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="url"
                  id="url"
                  disabled={formState.status === 'submitting'}
                  value={formState.originalUrl}
                  onChange={(e) => setFormState(prev => ({ 
                    ...prev, 
                    originalUrl: e.target.value,
                    status: prev.status === 'error' ? 'idle' : prev.status,
                    error: undefined
                  }))}
                  className="block w-full pl-10 pr-12 py-3 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="https://example.com"
                />
              </div>
              
              {formState.status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 flex items-center text-sm text-red-600"
                >
                  <AlertCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
                  {formState.error}
                </motion.div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={formState.status === 'submitting' || !formState.originalUrl.trim()}
              className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors"
            >
              {formState.status === 'submitting' ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Process Link
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};