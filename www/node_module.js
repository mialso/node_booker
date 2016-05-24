/* concept of a module
var Global = (function() {
    var static_data;
    return {
        here comes object
    };
}
*/
function Node() {
    // static data
    var domel_uri = "/actions/get_node_element.cgi";
    var data_uri = "/actions/get_nodes.cgi";

    // objects server data
    var nodes[];

    // DOM element representation
    var _domel_proto;
    this.__defineSetter__("domel_proto", function(htmlString) {

        _domel_proto = document.createDocumentFragment();
        var temp = document.createElement('div');
        temp.insertAdjacentHTML('afterbegin', htmlString);
        while (temp.firstChild) {
            _domel_proto.appendChild(temp.firstChild);
        }
    });
    var domels[];

    // CSSOM element representation
    var cssomel_proto;
    var cssomels[];

    // states????

    // methods('instance' operations/actions)

    // functions('class' operations/actions) 


    // interface

};
// create interface
(function() {
    Node.__proto__.init = function() {};

})();
