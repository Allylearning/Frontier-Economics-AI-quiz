import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <BrainCircuit size={32} />
          <h1 className="text-2xl font-headline font-normal uppercase">Frontier Economics AI policy quiz</h1>
        </Link>
        {/* Future navigation items can go here */}
      </div>
    </header>
  );
};

export default Header;
