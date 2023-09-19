import connectDB from '@/lib/mongodb';
import Order from '@/models/order';
import Product from '@/models/product'; // Import the Product model
import User from '@/models/user';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    const userId = req.headers.get('User');
    const user = await User.findOne({ _id: userId });

    if (user && user.isAdmin) {
      const orderCreationDates = await Order.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 },
        },
      ]);

      const orderTimeSeriesData = orderCreationDates.map((item) => ({
        date: new Date(item._id.year, item._id.month - 1, item._id.day),
        count: item.count,
      }));

      const totalOrders = await Order.countDocuments();

      const pendingOrders = await Order.countDocuments({ status: 'pending' });

      const completedOrders = await Order.countDocuments({
        status: 'completed',
      });

      const latestProducts = await Product.find()
        .sort({ createdAt: -1 })
        .limit(5);

      const latestOrders = await Order.find().sort({ createdAt: -1 }).limit(5); // Limit the results to the latest 5 orders

      const userRegistrationDates = await User.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 },
        },
      ]);

      const userRegistrationTimeSeriesData = userRegistrationDates.map(
        (item) => ({
          date: new Date(item._id.year, item._id.month - 1, item._id.day),
          count: item.count,
        })
      );
      return NextResponse.json({
        status: true,
        data: {
          totalOrders,
          pendingOrders,
          completedOrders,
          latestProducts,
          latestOrders,
          orderTimeSeriesData,
          userRegistrationTimeSeriesData,
        },
      });
    } else {
      return NextResponse.json(
        {
          status: false,
          message: 'Please login as Admin',
        },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error('Internal Server Error', { status: 500 });
  }
}
