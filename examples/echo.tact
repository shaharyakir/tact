contract Echo {

    init(a: Int) {
        
    }
    
    receive(msg: String) {
        self.reply(msg.asComment());
    }
    
    receive(msg: Slice) {
        self.reply(msg.asCell());
    }

    get fun hello(src: String): String {
        let builder: StringBuilder = beginString();
        builder.append("Hello, ");
        builder.append(src);
        return builder.toString();
    }
}