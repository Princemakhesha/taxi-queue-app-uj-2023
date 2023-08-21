import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const db = await sqlite.open({
    filename: './taxi_queue.db',
    driver: sqlite3.Database
});

await db.migrate();

export async function joinQueue() {
    // console.log('join queue')
    await db.run('UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count + 1');

}

export async function leaveQueue() {
    await db.run('UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count - 1 WHERE passenger_queue_count > 0 LIMIT 1');

}

export async function joinTaxiQueue() {
    await db.run('UPDATE taxi_queue SET taxi_queue_count = taxi_queue_count + 1');

}

export async function queueLength() {
    const row = await db.get('SELECT SUM(passenger_queue_count) as total FROM taxi_queue');
    return row.total || 0;

}

export async function taxiQueueLength() {
    const row = await db.get('SELECT taxi_queue_count FROM taxi_queue');
    return row.taxi_queue_count || 0;

}

export function taxiDepart() {
    const taxiRow = db.get('SELECT taxi_queue_count FROM taxi_queue');
    if (taxiRow.taxi_queue_count > 0) {
     db.run(`UPDATE taxi_queue SET taxi_queue_count = taxi_queue_count - 1`);
    }
}