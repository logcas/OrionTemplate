// jsx demo
// see more usage: https://github.com/vuejs/jsx#installation
export default {
    name: 'JsxDemo',
    data() {
        return {
            msg: 'test-jsx'
        }
    },
    render() {
        return (
            <div>
                <p>{ this.msg }</p>
                <input vModel={this.msg} type="text"/>
            </div>
        )
    }
};
