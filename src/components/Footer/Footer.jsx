import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <footer className="bg-gray-800 text-white text-muted-foreground py-8 px-4 md:px-8 mt-5">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
             <h4 className="text-lg font-bold mb-4">About BuzzBee</h4>
             <p className="text-sm mb-4">
             BuzzBee is a startup e-commerce platform offering a diverse range of products across multiple categories.
             </p>
             <div className="flex items-center gap-4">
               <Link href="#" className="hover:underline" prefetch={false}>
                 <FacebookIcon className="h-6 w-6" />
               </Link>
               <Link href="#" className="hover:underline" prefetch={false}>
                 <TwitterIcon className="h-6 w-6" />
               </Link>
               <Link href="#" className="hover:underline" prefetch={false}>
                 <InstagramIcon className="h-6 w-6" />
               </Link>
             </div>
           </div>
          {/* <div>
            <h4 className="text-lg font-bold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Press
                </Link>
              </li>
            </ul>
          </div> */}
          <div>
            <h4 className="text-lg font-bold mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Order Status
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Email Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Call Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline" prefetch={false}>
                  Visit Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">&copy; 2024 BuzzBee. All rights reserved.</div>
      </footer>
  )
}

export default Footer







// import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
// import React from 'react'
// import { Link } from 'react-router-dom'

// const Footer = () => {
//   return (
//     <footer className="bg-primary text-primary-foreground py-8 px-6 md:px-8">
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h4 className="text-lg font-bold mb-4">About Flipkart</h4>
//             <p className="text-sm mb-4">
//               Flipkart is India's leading e-commerce marketplace, offering a wide range of products across various
//               categories.
//             </p>
//             <div className="flex items-center gap-4">
//               <Link href="#" className="hover:underline" prefetch={false}>
//                 <FacebookIcon className="h-6 w-6" />
//               </Link>
//               <Link href="#" className="hover:underline" prefetch={false}>
//                 <TwitterIcon className="h-6 w-6" />
//               </Link>
//               <Link href="#" className="hover:underline" prefetch={false}>
//                 <InstagramIcon className="h-6 w-6" />
//               </Link>
//             </div>
//           </div>
//           <div>
//             <h4 className="text-lg font-bold mb-4">Customer Service</h4>
//             <ul className="space-y-2">
//               <li>
//                 <Link href="#" className="hover:underline" prefetch={false}>
//                   Help Center
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:underline" prefetch={false}>
//                   Track Order
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:underline" prefetch={false}>
//                   Return Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:underline" prefetch={false}>
//                   Shipping Info
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-bold mb-4">Sell on Flipkart</h4>
//             <ul className="space-y-2">
//               <li>
//                 <Link href="#" className="hover:underline" prefetch={false}>
//                   Become a Seller
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:underline" prefetch={false}>
//                   Seller Hub
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:underline" prefetch={false}>
//                   Seller University
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:underline" prefetch={false}>
//                   Seller Policies
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-bold mb-4">About Us</h4>
//             <ul className="space-y-2">
//               <li>
//                 <Link href="#" className="hover:underline" prefetch={false}>
//                   Company Info
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:underline" prefetch={false}>
//                   Careers
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:underline" prefetch={false}>
//                   Press
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:underline" prefetch={false}>
//                   Flipkart Stories
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="mt-8 text-center text-sm">&copy; 2024 Flipkart. All rights reserved.</div>
//       </footer>
//   )
// }

// export default Footer
