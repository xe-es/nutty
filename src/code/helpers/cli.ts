/**
 * @name                                    cli.js
 * @description                             command-line interface
*/


/* ---------------------------------------- PACK ----------------------------------------  */

    import { Command }                      from 'commander';

/* ---------------------------------------- ---- ----------------------------------------  */


/* ---------------------------------------- INIT ----------------------------------------  */

    interface Data
    {
        options: [string, string][];

        project:
        {
            name: string;
            version: string;
            description: string;
        };
    }

    interface Core
    {
        events?:
        {
            onBeg?: () => void;
            onEnd?: () => void;
        };

        actions:
        {
            [key: string]: (options: any) => Promise<void>;
        };
    }

    const program = new Command();

/* ---------------------------------------- ---- ----------------------------------------  */

/* ---------------------------------------- CORE ----------------------------------------  */

    /**
     * A function that handles command-line interface operations.
     *
     * @param {Data} data - The data object containing options and project information.
     * @param {Core} core - The core object with event handlers and actions.
     * @return {Promise<void>} This function does not return anything explicitly.
     */
    const CLI
    = async function ({ data, core }: { data: Data; core: Core })
    : Promise<void>
    {
        for (let i = 0; i < data.options.length; i++) {
            program.option(data.options[i][0], data.options[i][1]);
        }

        program
            .name(data.project.name)
            .version(data.project.version)
            .description(data.project.description)
            .action(async () => {
                // Get options
                const options = program.opts();

                // Trigger onBeg event
                if (core.events && core.events.onBeg) core.events.onBeg();

                // Trigger action
                const actionKeys = Object.keys(core.actions);
                for (let i = 0; i < actionKeys.length; i++) {
                    if (options[actionKeys[i]]) await core.actions[actionKeys[i]](options);
                }

                // Trigger onEnd event
                if (core.events && core.events.onEnd) core.events.onEnd();
            });

        program.parse(process.argv);
    };

    export { CLI, Data, Core };

/* ---------------------------------------- ---- ----------------------------------------  */