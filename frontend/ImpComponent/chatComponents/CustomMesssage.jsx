import React from 'react'
import { MessageSimple } from 'stream-chat-react'

const CustomMesssage = (props) => {
    const {message} = props;;

    const {product} = message?.product || {};
    console.log("Message Product:", message?.product);

  return (
 <div className="mb-4">
      {/* Render Product Details if Present */}
      {product && (
        <div className="border rounded-lg p-4 bg-gray-100 mb-2">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto mt-2 rounded-md"
            />
          )}
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        </div>

    )}

    {/* Render Default Message */}
    <MessageSimple {...props} />
    </div>

  )
}

export default CustomMesssage
