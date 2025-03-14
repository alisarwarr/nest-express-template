import { Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { upload } from './../config/multer';
import { Request, Response } from 'express';

@Controller('photo')
export class PhotoController {
    constructor(
        private readonly photoService: PhotoService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', upload))
    async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
        console.log(file);                                                        // from Multer and attached to the request as request.file
//      return res.json(file);                                                    // send file details back to client ( for local ) for multer({ dest: "src/uploads/" })

        await this.photoService.checkPhotoDuplicate(file.originalname);

        const photo = await this.photoService.createPhoto(file);

        return { message: "photo uploaded successfully", photo };
    }

    @Get('/:id')
    async fetchPhoto(@Req() req: Request, @Res() res: Response) {
        console.log(req.params);

        const photo = await this.photoService.checkPhotoExist(req.params.id);

        return { message: "photo fetch successfully", photo };
    }
}