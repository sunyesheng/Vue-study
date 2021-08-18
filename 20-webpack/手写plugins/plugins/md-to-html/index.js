

class MdToHtmlPlugin {
    constructor({ template, filename }) {
        if (!template) {
            throw new Error('template must be exit')
        }

        this.template = template;
        this.filename = filename ? filename : 'md.html';
    }
    apply (compiler) {
        compiler.hooks.emit.tap('md-to-html-plugin', (compilation) => {
            const _assets = compilation.assets;
            const _mdConten = readFileSync(this.template, 'utf8')
            console.log(_mdConten);
        })
    }
}
module.exports = MdToHtmlPlugin