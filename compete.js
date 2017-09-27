const type = require('type-mark');
const fs   = require('fs');
const rl   = require('readline');

const readline = rl.createInterface({
    input    : process.stdin,
    output   : process.stdout,
    terminal : false
});

const refilter = (sfn, arr) => arr.filter((a, i) => {
    const [result, nfn] = sfn(a, i, arr);
    sfn = nfn;
    return result;
});

/**
 * The challenge function. Expects any number of response functions that takes a
 * line in and returns a line to go out. The first argument can optionally be
 * a conofig object. It supports the following options:
 *
 * - clear : delete the output file before writing
 * - out   : the output file to write to
 * - echo  : whether the output should be shown on the command line
 * - trim  : trim input and ignore empty lines
 *
 * @param options   object             a configuration options
 * @param responses [string -> string] any number of functions to apply to output
 */
module.exports = function challenge(...responses) {

    const options = type(responses[0]).object
        ? responses.shift()
        : {};


    if(options.out && options.clear !== false) {
        try { fs.unlinkSync(options.out); } catch(_) {}
    }

    // Create handler

    const handler = line => {
        if(options.trim !== false) {
            line = line.trim();
            if(!line.length) {
                return;
            }
        }
        const result = responses.reduce((acc, fn) =>
            fn(acc), line);
        if(options.out) {
            fs.appendFileSync(options.out, result + (options.newline !== false
                ? '\n'
                : ''));
        }
        if(options.echo !== false) {
            console.log(result);
        }
    };

    // Handle file IO

    const nfn = () => [true, nfn];
    const sfn = a  => /\.js$/.test(a)
        ? [false, nfn]
        : [false, sfn];
    const args   = refilter(sfn, process.argv);
    const buffer = args.reduce((acc, path) =>
        (acc + fs.readFileSync(path, 'utf8')), '');

    buffer.split('\n').forEach(handler);

    // Handle cli IO

    readline.on('line', handler);
};