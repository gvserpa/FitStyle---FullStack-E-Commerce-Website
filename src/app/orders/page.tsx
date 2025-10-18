"use client"

import React, { useState } from 'react';
import { Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  estimatedDelivery: string;
  currentLocation: string;
  trackingNumber: string;
  timeline: TimelineEvent[];
}

interface TimelineEvent {
  status: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export default function OrderTrackingPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Mock data - Replace with real data from your backend/Supabase
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: '#ORD-2025-001',
      date: '2025-10-15',
      status: 'delivered',
      items: [
        { id: '1', name: 'Wireless Headphones', price: 129.99, quantity: 1, imageUrl: null },
        { id: '2', name: 'Phone Case', price: 29.99, quantity: 2, imageUrl: null },
      ],
      total: 189.97,
      estimatedDelivery: '2025-10-20',
      currentLocation: 'São Paulo, SP',
      trackingNumber: 'BR123456789',
      timeline: [
        { status: 'Pedido Confirmado', date: '2025-10-15', time: '14:30', location: 'Centro de Distribuição', description: 'Seu pedido foi confirmado' },
        { status: 'Processando', date: '2025-10-15', time: '16:45', location: 'Centro de Distribuição', description: 'Seu pedido está sendo preparado' },
        { status: 'Enviado', date: '2025-10-16', time: '09:00', location: 'Centro de Distribuição', description: 'Seu pedido saiu para entrega' },
        { status: 'Em Trânsito', date: '2025-10-17', time: '11:20', location: 'Campinas, SP', description: 'Seu pedido está a caminho' },
        { status: 'Entregue', date: '2025-10-19', time: '15:30', location: 'São Paulo, SP', description: 'Seu pedido foi entregue' },
      ],
    },
    {
      id: '2',
      orderNumber: '#ORD-2025-002',
      date: '2025-10-18',
      status: 'shipped',
      items: [
        { id: '3', name: 'USB-C Cable', price: 19.99, quantity: 3, imageUrl: null },
      ],
      total: 59.97,
      estimatedDelivery: '2025-10-23',
      currentLocation: 'Em Trânsito - São Paulo',
      trackingNumber: 'BR987654321',
      timeline: [
        { status: 'Pedido Confirmado', date: '2025-10-18', time: '10:15', location: 'Centro de Distribuição', description: 'Seu pedido foi confirmado' },
        { status: 'Processando', date: '2025-10-18', time: '12:00', location: 'Centro de Distribuição', description: 'Seu pedido está sendo preparado' },
        { status: 'Enviado', date: '2025-10-19', time: '08:30', location: 'Centro de Distribuição', description: 'Seu pedido saiu para entrega' },
        { status: 'Em Trânsito', date: '2025-10-20', time: '14:00', location: 'São Paulo, SP', description: 'Seu pedido está a caminho' },
      ],
    },
    {
      id: '3',
      orderNumber: '#ORD-2025-003',
      date: '2025-10-19',
      status: 'confirmed',
      items: [
        { id: '4', name: 'Keyboard Mechanical', price: 249.99, quantity: 1, imageUrl: null },
      ],
      total: 249.99,
      estimatedDelivery: '2025-10-24',
      currentLocation: 'Centro de Distribuição',
      trackingNumber: 'BR555666777',
      timeline: [
        { status: 'Pedido Confirmado', date: '2025-10-19', time: '18:45', location: 'Centro de Distribuição', description: 'Seu pedido foi confirmado' },
      ],
    },
  ];

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
      processing: 'bg-purple-100 text-purple-800 border-purple-300',
      shipped: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      delivered: 'bg-green-100 text-green-800 border-green-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status];
  };

  const getStatusIcon = (status: Order['status']) => {
    const icons = {
      pending: <Clock size={16} />,
      confirmed: <CheckCircle size={16} />,
      processing: <Package size={16} />,
      shipped: <Truck size={16} />,
      delivered: <CheckCircle size={16} />,
      cancelled: <AlertCircle size={16} />,
    };
    return icons[status];
  };

  const getStatusLabel = (status: Order['status']) => {
    const labels = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      processing: 'Processando',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado',
    };
    return labels[status];
  };

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Rastreamento de Pedidos</h1>
          <p className="text-gray-600 mt-2">Acompanhe suas compras confirmadas em tempo real</p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Nenhum pedido encontrado</h2>
              <p className="text-gray-600">Você ainda não fez nenhuma compra. Comece agora!</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Order Header */}
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Pedido em: {new Date(order.date).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-600">
                      Entrega estimada: {new Date(order.estimatedDelivery).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right mr-4">
                    <p className="text-2xl font-bold text-gray-900">R$ {order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{order.items.length} item(ns)</p>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-gray-600 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Expanded Content */}
                {expandedOrder === order.id && (
                  <div className="border-t border-gray-200 p-6 space-y-6">
                    {/* Current Status */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 flex items-center gap-4">
                      <MapPin size={24} className="text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Localização Atual</p>
                        <p className="text-lg font-bold text-gray-900">{order.currentLocation}</p>
                        <p className="text-xs text-gray-600 mt-1">Rastreamento: {order.trackingNumber}</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">Histórico do Pedido</h4>
                      <div className="relative">
                        {order.timeline.map((event, index) => (
                          <div key={index} className="flex gap-4 mb-6 last:mb-0">
                            {/* Timeline Dot */}
                            <div className="flex flex-col items-center">
                              <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md z-10 relative"></div>
                              {index !== order.timeline.length - 1 && (
                                <div className="w-1 h-16 bg-gradient-to-b from-blue-300 to-gray-200 mt-2"></div>
                              )}
                            </div>
                            {/* Timeline Content */}
                            <div className="pb-2">
                              <p className="font-semibold text-gray-900">{event.status}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                              </p>
                              <p className="text-sm text-gray-600">{event.location}</p>
                              <p className="text-sm text-gray-700 mt-1">{event.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">Itens do Pedido</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-900">R$ {(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Contatar Suporte
                      </button>
                      <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Baixar Recibo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}