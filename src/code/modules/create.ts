/**
 * @name                                    create.ts
 * @description                             create module
*/


/* ---------------------------------------- PACK ----------------------------------------  */

    import path                             from 'path';
    import fs                               from 'fs';
    import { exec }                         from 'child_process';

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- INIT ----------------------------------------  */

    export default                          async function (args: any)
    : Promise<void>
    {
        try
        {
            // Get
            const _create   : string        = typeof args.create   === 'undefined' ? '' : args.create;
            const _as       : string        = typeof args.as       === 'undefined' ? '' : args.as;

            // Check
            if(!_create.length || !_as.length)
            throw 'Project type is required, use --as <type>';

            // Extract the arguments
            const name  : string            = _create;
            const type  : string            = _as;
            const force : boolean           = typeof args.force === 'undefined' ? false : true;

            // Clone the project repo
            await CloneRepo({ name, type, force });
        }

        catch (error)
        {
            console.log(`Failed to create the project : ${error}`);
        }
    };

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- HELP ----------------------------------------  */

    interface CloneRepoOptions
    {
        name        : string;
        type        : string;
        force       : boolean;
    }

    async function CloneRepo({ name, type, force }: CloneRepoOptions): Promise<string>
    {
        const rootPath = path.join(process.cwd(), name);

        // Get/Set the repo info
        const owner : string = 'xe-es';
        let   repo  : string = '';
        {
            if(type === 'npm') repo = 'nutty-npm-package';
            else if(type === 'electron') repo = 'nutty-electron-app';

            else throw new Error('Invalid project type');
        }

        // Check if the repo type is valid
        if (!repo) throw new Error('Invalid project type');

        // Check if the folder already exists
        if (fs.existsSync(rootPath))
        {
            if (!force) throw new Error('Folder already exists');
            else fs.rmSync(rootPath, { recursive: true });
        }

        // Clone the repo
        const command = `git clone https://github.com/${owner}/${repo}.git ${name}`;
        await new Promise<void>((resolve, reject) =>
        {
            exec(command, (error, stdout, stderr) =>
            {
                if (error) reject(error);
                else resolve();
            });
        });

        // Remove the .git folder
        fs.rmSync(path.join(rootPath, '.git'), { recursive: true });

        // Return the root folder
        return rootPath;
    }

/* ---------------------------------------- ---- ----------------------------------------  */