import { parsedEnv } from './env';

if (!parsedEnv.success) {
    console.error('Invalid environment variables', parsedEnv.error.flatten().fieldErrors),

    ;

    throw new Error('Invalid environment variables');

}
