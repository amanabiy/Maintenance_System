import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { MaintenanceRequest } from 'src/modules/maintenance_request/entities/maintenance_request.entity';

@Entity('media')
export class Media extends BaseModelEntity {
  @Column()
  @ApiProperty({ description: 'The filename of the media' })
  filename: string;

  @Column()
  @ApiProperty({ description: 'The MIME type of the media' })
  mimetype: string;

  @Column()
  @ApiProperty({ description: 'The path where the media is stored' })
  path: string;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'uploaded_by' })
  @ApiProperty({ description: 'The user who uploaded the media', nullable: true })
  @Exclude()
  uploadedBy: Promise<User>;

  @ManyToOne(() => MaintenanceRequest, request => request.mediaFiles, {cascade: true})
  @JoinColumn({ name: 'maintenance_request' })
  maintenanceRequests: MaintenanceRequest[];

  @OneToOne(() => User, user => user.avatar, { cascade: true, nullable: true })
  @JoinColumn({ name: 'avatar_of_user' })
  userAvatar: User;
}
