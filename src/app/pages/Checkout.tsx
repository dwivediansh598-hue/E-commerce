import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { CreditCard, MapPin, Mail, Lock, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutFormData } from '../types';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

export function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>();

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success('Order placed successfully!', {
      description: 'You will receive a confirmation email shortly.',
    });
    clearCart();
    setIsProcessing(false);
    navigate('/');
  };

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.1;
  const total = cartTotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Secure Checkout
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Lock className="size-4" />
          <span>Your information is secure and encrypted</span>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                  <CardTitle className="flex items-center gap-2">
                    <div className="bg-blue-600 text-white rounded-full size-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <Mail className="size-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && (
                      <span className="text-sm text-red-500">{errors.email.message}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                  <CardTitle className="flex items-center gap-2">
                    <div className="bg-blue-600 text-white rounded-full size-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <MapPin className="size-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        {...register('firstName', { required: 'First name is required' })}
                      />
                      {errors.firstName && (
                        <span className="text-sm text-red-500">{errors.firstName.message}</span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        {...register('lastName', { required: 'Last name is required' })}
                      />
                      {errors.lastName && (
                        <span className="text-sm text-red-500">{errors.lastName.message}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      {...register('address', { required: 'Address is required' })}
                    />
                    {errors.address && (
                      <span className="text-sm text-red-500">{errors.address.message}</span>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="San Francisco"
                        {...register('city', { required: 'City is required' })}
                      />
                      {errors.city && (
                        <span className="text-sm text-red-500">{errors.city.message}</span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="USA"
                        {...register('country', { required: 'Country is required' })}
                      />
                      {errors.country && (
                        <span className="text-sm text-red-500">{errors.country.message}</span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        placeholder="94102"
                        {...register('postalCode', { required: 'Postal code is required' })}
                      />
                      {errors.postalCode && (
                        <span className="text-sm text-red-500">{errors.postalCode.message}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                  <CardTitle className="flex items-center gap-2">
                    <div className="bg-blue-600 text-white rounded-full size-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <CreditCard className="size-5" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      {...register('cardNumber', { required: 'Card number is required' })}
                    />
                    {errors.cardNumber && (
                      <span className="text-sm text-red-500">{errors.cardNumber.message}</span>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardExpiry">Expiry Date</Label>
                      <Input
                        id="cardExpiry"
                        placeholder="MM/YY"
                        {...register('cardExpiry', { required: 'Expiry date is required' })}
                      />
                      {errors.cardExpiry && (
                        <span className="text-sm text-red-500">{errors.cardExpiry.message}</span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cardCvc">Security Code (CVC)</Label>
                      <Input
                        id="cardCvc"
                        placeholder="123"
                        {...register('cardCvc', { required: 'CVC is required' })}
                      />
                      {errors.cardCvc && (
                        <span className="text-sm text-red-500">{errors.cardCvc.message}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="lg:sticky lg:top-24 self-start border-2">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {cartItems.map(({ product, quantity }) => (
                      <div key={product.id} className="flex gap-3">
                        <div className="size-16 rounded overflow-hidden shrink-0">
                          <img src={product.image} alt={product.name} className="size-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                          <p className="font-semibold">${(product.price * quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <Badge variant="secondary">Free</Badge>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Check className="size-5 mr-2" />
                        Place Order ${total.toFixed(2)}
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </form>
    </div>
  );
}
