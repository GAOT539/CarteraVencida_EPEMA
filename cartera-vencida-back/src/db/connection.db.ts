import { Sequelize } from "sequelize";

class Connection {
    private static instance: Sequelize | null = null;

    private constructor() {

    }

    public static getInstance(): Sequelize {
        if (!Connection.instance) {
            // Config DBConnection only once
            Connection.instance = new Sequelize('cartera_vencida', 'root', '12345', {
                host: 'localhost',
                dialect: 'mysql',
                logging: false
            });
        }
        return Connection.instance;
    }
}

export default Connection.getInstance();