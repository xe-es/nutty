#!/usr/bin/env node

/**
 * @name                                    main.ts
 * @description                             main file of the project
*/


/* ---------------------------------------- PACK ----------------------------------------  */

    import { CLI }                          from './helpers/cli';
    import create                           from './modules/create';

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- INIT ----------------------------------------  */

    const Main                              = async function ()
    {
        // Run the CLI application
        await CLI
        ({
            data                            :
            {
                project                     :
                {
                    name                    : 'nutty',
                    description             : 'A simple package for creating projects faster',
                    version                 : '0.0.0',
                },

                options                     :
                [
                    ['-c, --create <name>'  , 'create a new project'],
                    ['--as <type>'          , 'project type (npm, electron, ..)'],
                    ['-f, --force'          , 'force create a new project'],
                ]
            },

            core                            :
            {
                actions                     :
                {
                    create
                }
            }
        });
    }

    export default                          Main();

/* ---------------------------------------- ---- ----------------------------------------  */