import { randomUUID } from 'node:crypto'
import { CheckIn, Prisma } from '@prisma/client'

import { CheckInsRepository } from '@/repositories'

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async findByUserIdOnDate(userId: string, date: Date) {
        const checkInOnSameDate = this.items.find((checkIn) =>
                checkIn.user_id === userId &&
                checkIn.created_at.getDate() === date.getDate() &&
                checkIn.created_at.getMonth() === date.getMonth() &&
                checkIn.created_at.getFullYear() === date.getFullYear()
        )

        if (!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        }

        this.items.push(checkIn)

        return checkIn
    }
}
