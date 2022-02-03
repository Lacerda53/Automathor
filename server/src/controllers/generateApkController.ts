import { Request, Response } from 'express';
import { cd, asyncExec } from 'async-shelljs';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { writeServiceContainer } from '../helpers/fileServiceHelp';

class GenerateApkController {
    async index(req: Request, res: Response) {
        try {

            const {
                repository = `https://${process.env.GITHUB_TOKEN}@github.com/SofitSoftware/sofit-view-mobile.git`,
                branch,
                container
            } = req.body;
            const id = uuidv4();

            cd('public')
            console.log('Clonando Projeto');
            await asyncExec(`git clone ${repository} ${id} -b ${branch || 'master'}`);
            cd(id);

            if (container) {

                cd('src/services');
                await asyncExec('rm -rf api.ts');
                fs.writeFile('api.ts', writeServiceContainer(container), (err) => {

                    if (err) throw err;

                    console.log(`Apk apontando para container ${container}`);
                })
            }
            console.log('Instalando Pacotes');
            await asyncExec('yarn');
            console.log('Pacotes instalados');
            cd('android');
            // console.log('Limpando build');
            // await asyncExec('./gradlew clean');
            console.log('Gerando APK');
            await asyncExec('./gradlew assembleRelease');
            res.download(`${__dirname}/../../public/${id}/android/app/build/outputs/apk/release/app-release.apk`);
        } catch {

            res.sendStatus(500);
        }
    }
}

export { GenerateApkController };