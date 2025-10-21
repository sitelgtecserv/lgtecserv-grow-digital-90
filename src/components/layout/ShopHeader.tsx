import { ShoppingBag, LogOut, Shield, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

interface ShopHeaderProps {
  onCartOpen?: () => void;
  onSearchOpen?: () => void;
}

export const ShopHeader = ({ onCartOpen, onSearchOpen }: ShopHeaderProps) => {
  const { user, signOut, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/loja')}>
            <div className="bg-gradient-primary p-2 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">LG TecServ</h1>
              <p className="text-xs text-muted-foreground">Loja Online</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartCount > 0 && (
              <Button
                variant="outline"
                size="lg"
                onClick={onCartOpen}
                className="relative"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Carrinho
                <Badge
                  variant="destructive"
                  className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cartCount}
                </Badge>
              </Button>
            )}
            {isAdmin && (
              <Button variant="outline" onClick={() => navigate('/admin')}>
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </Button>
            )}
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <div className="bg-gradient-primary p-2 rounded-lg">
                    <ShoppingBag className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{user?.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {isAdmin ? 'Administrador' : 'Cliente'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    navigate('/loja');
                    setMobileMenuOpen(false);
                  }}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Loja
                </Button>
                {isAdmin && (
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      navigate('/admin');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2" onClick={() => navigate('/loja')}>
            <div className="bg-gradient-primary p-1.5 rounded-lg">
              <ShoppingBag className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-bold">LG TecServ</h1>
          </div>

          <div className="flex items-center gap-1">
            {onSearchOpen && (
              <Button variant="ghost" size="icon" onClick={onSearchOpen}>
                <Search className="h-5 w-5" />
              </Button>
            )}
            {cartCount > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onCartOpen}
                className="relative"
              >
                <ShoppingBag className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]"
                >
                  {cartCount}
                </Badge>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
