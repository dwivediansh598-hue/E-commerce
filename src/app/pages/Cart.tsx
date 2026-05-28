import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.1;
  const total = cartTotal + shipping + tax;
  const savings = cartItems.reduce((sum, item) => {
    if (item.product.originalPrice) {
      return sum + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return sum;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-full p-8 inline-block mb-6">
            <ShoppingBag className="size-24 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Looks like you haven't added any products yet. Start exploring our collection!
          </p>
          <Link to="/products">
            <Button size="lg" className="px-8">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Shopping Cart
        </h1>
        <p className="text-muted-foreground">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(({ product, quantity }, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <Link to={`/products/${product.id}`} className="shrink-0">
                      <div className="size-32 overflow-hidden rounded-lg relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-full object-cover hover:scale-110 transition-transform"
                        />
                        {product.discount && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-xs z-10">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <Link to={`/products/${product.id}`}>
                            <h3 className="font-semibold text-lg hover:text-primary transition truncate">
                              {product.name}
                            </h3>
                          </Link>
                          <Badge variant="secondary" className="mt-1">
                            {product.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(product.id)}
                          className="shrink-0"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-9"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                          >
                            <Minus className="size-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold text-lg">
                            {quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-9"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                          >
                            <Plus className="size-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          {product.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              ${(product.originalPrice * quantity).toFixed(2)}
                            </p>
                          )}
                          <span className="text-2xl font-bold">
                            ${(product.price * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="lg:sticky lg:top-24 self-start">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                {savings > 0 && (
                  <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <Tag className="size-4" />
                      <span className="font-semibold">
                        You're saving ${savings.toFixed(2)}!
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <Badge variant="secondary">Free</Badge>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {cartTotal < 50 && shipping > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Add ${(50 - cartTotal).toFixed(2)} more for free shipping
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout <ArrowRight className="size-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="ghost" className="w-full mt-2">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
