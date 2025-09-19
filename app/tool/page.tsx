'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import InputArea from './components/InputArea';
import OutputArea from './components/OutputArea';
import ConsoleLogger from './components/ConsoleLogger';
import APIResponseDebugger from './components/APIResponseDebugger';
import { type GeneratedImage } from '../lib/api-client';

export default function ToolPage() {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  const handleImagesGenerated = (newImages: GeneratedImage[]) => {
    // 将新生成的图片添加到现有图片列表的开头
    setGeneratedImages(prevImages => [...newImages, ...prevImages]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Input Area */}
      <InputArea onImagesGenerated={handleImagesGenerated} />
      
      {/* Output Area */}
      <OutputArea generatedImages={generatedImages} />
      
      {/* Console Logger for debugging */}
      <ConsoleLogger />
      
      {/* API Response Debugger */}
      <APIResponseDebugger />
    </div>
  );
}
