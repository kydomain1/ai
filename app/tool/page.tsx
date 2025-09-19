import Sidebar from './components/Sidebar';
import InputArea from './components/InputArea';
import OutputArea from './components/OutputArea';

export default function ToolPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Input Area */}
      <InputArea />
      
      {/* Output Area */}
      <OutputArea />
    </div>
  );
}
