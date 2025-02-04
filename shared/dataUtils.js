import moment from 'moment';

export function formatChartData(data) {
    return data.map(entry => ({
        date: moment(entry.date).format("MMM 'YY"),
        sales: entry.sales,
        orders: entry.orders
    }));
}
