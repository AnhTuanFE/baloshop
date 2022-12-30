import clsx from "clsx";
import styles from "./ProductsComponentCSS/Products.module.scss";
function Products() {
  return (
    <div>
      <div className={clsx(styles.wrap_information)}>
        <div className={clsx(styles.wrap_image)}>
          <img
            src="/images/vali1.jpg"
            alt=""
            className={clsx(styles.image_product)}
          />
        </div>
        {/*  */}
        <div className={clsx(styles.wrap_information_product)}>
          <div className={clsx(styles.title_product)}>
            <h1>Vali đẹp</h1>
          </div>
          <div className={clsx(styles.wrap_image_slider)}>
            <img
              src="https://cf.shopee.vn/file/3c01f7e0e9c412a21aa891dd700d17e6"
              alt=""
              className={clsx(styles.image_slider)}
            />
          </div>
          <div className={clsx(styles.information_product)}>
            <div className={clsx(styles.information_product_detail)}>
              <h4>Giá</h4>
              <span>1.000.000đ</span>
            </div>
            <div className={clsx(styles.information_product_detail)}>
              <h4>Trạng thái</h4>
              <span>Còn hàng</span>
            </div>
            <div className={clsx(styles.information_product_detail)}>
              <h4>Đánh giá</h4>
              <span>4 sao</span>
            </div>
            <div className={clsx(styles.information_product_detail)}>
              <h4>màu sắc</h4>
              <span>chọn màu</span>
            </div>
            <div className={clsx(styles.information_product_detail)}>
              <h4>Số lượng</h4>
              <span>100</span>
            </div>
          </div>
          <div className={clsx(styles.wrap_button_product)}>
            <button className={clsx(styles.button_product)}>
              <h2>Thêm vào giỏ</h2>
            </button>
          </div>
        </div>
      </div>
      {/* chi tiết sản phẩm */}
      <div className={clsx(styles.detail_product)}>
        <div>
          <h1 className={clsx(styles.tittle)}> Chi tiết sản phẩm</h1>
        </div>
        <div className={clsx(styles.detail_product_content)}>
          <h2 className={clsx(styles.text_head)}>THIẾT KẾ HIỆN ĐẠI</h2>
          <p className={clsx(styles.text_body)}>
            Với thiết kế hình hộp mang phong cách hiện đại, kết hợp cùng màu sắc
            nổi bật, balo chống gù 852 được phần lớn phụ huynh tin tưởng lựa
            chọn. Ngoài ra, balo chống gù 852 có thể dễ dàng gắp gọn khi vệ sinh
            balo và bảo quản.
          </p>
        </div>
        <div className={clsx(styles.detail_product_content)}>
          <h2 className={clsx(styles.text_head)}>THIẾT KẾ HIỆN ĐẠI</h2>
          <p className={clsx(styles.text_body)}>
            Với thiết kế hình hộp mang phong cách hiện đại, kết hợp cùng màu sắc
            nổi bật, balo chống gù 852 được phần lớn phụ huynh tin tưởng lựa
            chọn. Ngoài ra, balo chống gù 852 có thể dễ dàng gắp gọn khi vệ sinh
            balo và bảo quản.
          </p>
        </div>{" "}
        <div className={clsx(styles.detail_product_content)}>
          <h2 className={clsx(styles.text_head)}>THIẾT KẾ HIỆN ĐẠI</h2>
          <p className={clsx(styles.text_body)}>
            Với thiết kế hình hộp mang phong cách hiện đại, kết hợp cùng màu sắc
            nổi bật, balo chống gù 852 được phần lớn phụ huynh tin tưởng lựa
            chọn. Ngoài ra, balo chống gù 852 có thể dễ dàng gắp gọn khi vệ sinh
            balo và bảo quản.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Products;
