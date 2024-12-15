import { useState, useMemo, useEffect } from "react";
import { useFetcher, useNavigate } from "@remix-run/react";
import { toast } from "sonner";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Icon } from '@iconify/react/dist/iconify.js';
import { Category, Order, OrderItem, Product, Table } from "types";

interface OrderFormProps {
    table: Table;
    products: Array<Product>;
    categories: Array<Category>;
    existingOrder?: Order; // Nueva propiedad para la orden existente
}

const OrderForm: React.FC<OrderFormProps> = ({ table, products, categories, existingOrder }) => {
    const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
        if (existingOrder) {
            return existingOrder.details.map(detail => {
                const product = products.find(p => p.id === detail.product_id);
                return {
                    id: detail.product_id,
                    name: product?.name || '',
                    price: product?.price || 0,
                    quantity: detail.quantity
                };
            });
        }
        return [];
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const fetcher = useFetcher<{ error: string; status: number }>();
    const isSubmitting = fetcher.state === "submitting";
    const navigate = useNavigate();

    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data.error) {
                toast.error(fetcher.data.error);
            } else {
                toast.success("Orden actualizada exitosamente");
                navigate("/waiter/tables");
            }
        }
    }, [fetcher.data, navigate]);

    const filteredItems = useMemo(() => {
        return products.filter(item => {
            const matchesCategory = selectedCategory === 'all' || item.category.name === selectedCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery, products]);

    const addItemToOrder = (item: Product) => {
        setOrderItems(prev => {
            const existingItem = prev.find(i => i.id === item.id);
            if (existingItem) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    };

    const removeItemFromOrder = (id: number) => {
        setOrderItems(prev => prev.filter(item => item.id !== id));
    };

    const updateItemQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) {
            removeItemFromOrder(id);
        } else {
            setOrderItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
        }
    };

    const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (orderItems.length === 0) return;

        const formData = new FormData();
        formData.append("items", JSON.stringify(orderItems.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }))));

        fetcher.submit(formData, { method: existingOrder ? "put" : "post" });
    };

    const OrderSummary = () => (
        <div >
            {orderItems.length === 0 ? (
                <p className="text-center text-muted-foreground">No hay items en tu pedido</p>
            ) : (
                <>
                    {orderItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">${item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="light"
                                    onPress={() => updateItemQuantity(item.id, item.quantity - 1)}
                                >
                                    <Icon icon="mdi:minus" className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                    variant="light"
                                    onPress={() => updateItemQuantity(item.id, item.quantity + 1)}
                                >
                                    <Icon icon="mdi:plus" className="h-4 w-4" />
                                </Button>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={() => removeItemFromOrder(item.id)}
                                >
                                    <Icon icon="mdi:trash-can" className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="border-t pt-4">
                        <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <>
            <h1 className="text-black text-xl mb-5">{existingOrder ? `Editar Orden para la Mesa ${table.id}` : `Crear Orden para la Mesa ${table.id}`}</h1>
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="lg:flex-1">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                        <div className="relative flex-1 w-full">
                            <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Buscar platillos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-full"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-2 overflow-x-auto pb-4 mb-6">
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.name ? "solid" : "ghost"}
                                onPress={() => setSelectedCategory(category.name)}
                                className="flex items-center space-x-2 whitespace-nowrap"
                            >
                                <span></span>
                                <span>{category.name}</span>
                            </Button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredItems.map((item) => (
                            <Card key={item.id} className="overflow-hidden">
                                <CardBody>
                                    <h3>{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="font-bold">${item.price}</span>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <Button onPress={() => addItemToOrder(item)} className="w-full">
                                        <Icon icon="mdi:plus" className="mr-2 h-4 w-4" /> Agregar al Pedido
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="hidden lg:block lg:w-96">
                    <div className="sticky top-8">
                        <Card>
                            <CardHeader>
                                <h3>Tu Pedido</h3>
                            </CardHeader>
                            <CardBody>
                                <OrderSummary />
                            </CardBody>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    onKeyDown={handleSubmit}
                                    disabled={isSubmitting || orderItems.length === 0}
                                >
                                    Confirmar Pedido
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="lg:hidden mt-5">
                <Card className="">
                    <CardHeader>
                        <h3>Tu Pedido ({totalItems} items)</h3>
                    </CardHeader>
                    <CardBody className="max-h-64 overflow-auto">
                        <OrderSummary />
                    </CardBody>
                    <CardFooter>
                        <Button
                            className="w-full"
                            onClick={handleSubmit}
                            disabled={isSubmitting || orderItems.length === 0}
                        >
                            Confirmar Pedido (${totalPrice.toFixed(2)})
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

export default OrderForm;
