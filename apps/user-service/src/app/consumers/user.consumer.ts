import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Kafka, EachMessagePayload } from 'kafkajs';
import type { SignUpRequest } from '@vaahe/proto';

@Injectable()
export class UserConsumer implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(UserConsumer.name);
    private kafka!: Kafka;
    private consumer: any;

    onModuleInit = async () => {
        this.kafka = new Kafka({
            clientId: 'user-service-client',
            brokers: ['127.0.0.1:9092'], // or localhost if outside docker
        });

        this.consumer = this.kafka.consumer({ groupId: 'user-consumer-group' });
        await this.consumer.connect();
        this.logger.log('Kafka consumer connected');

        await this.consumer.subscribe({ topic: 'user.signup', fromBeginning: true });
        this.logger.log('Subscribed to topic user.signup');

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
                const value = message.value?.toString();
                this.logger.log(`Received message from topic ${topic}: ${value}`);
                const payload: SignUpRequest = JSON.parse(value || '{}');

                // await this.userRepository.create(payload);
            },
        });
    };

    onModuleDestroy = async () => {
        await this.consumer.disconnect();
        this.logger.log('Kafka consumer disconnected');
    };
}
