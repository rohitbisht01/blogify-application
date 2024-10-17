const MainBlog = () => {
  return (
    <div>
      <Test />
      {/* <Test />
      <Test />
      <Test /> */}
    </div>
  );
};

const Test = () => {
  return (
    <div
      className="my-10"
      style={{
        height: 200,
      }}
    >
      <div className="grid grid-cols-3 gap-5">
        <div
          style={{
            height: 200,
          }}
        >
          <img
            src="https://images.freeimages.com/images/large-previews/39c/winter-rosehips-1405800.jpg?fmt=webp&h=350"
            alt="Blog Image"
            className="object-cover h-full w-full rounded-md"
            loading="lazy"
          />
        </div>
        <div className="col-span-2">
          <h1 className="text-xl font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
            minus.
          </h1>
          <div className="flex items-center gap-3 text-gray-600 my-1">
            <p>@rohitbisht</p>
            <p>@date</p>
            <p>@time</p>
          </div>

          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
            expedita dolore atque reprehenderit facere consequatur praesentium
            repellat. Veritatis delectus eos, iste nisi unde fugiat illum porro
            repudiandae similique aspernatur libero deleniti. Iure numquam et
            magni quis velit mollitia, animi quo dolore quod quia alias
            {/* perspiciatis quos quas ex dicta, a recusandae accusamus veniam odit
            pariatur dignissimos! Nisi nobis ducimus hic. Illum, quibusdam.
            Omnis, nesciunt! Quos, eaque. Commodi veniam magni harum, accusamus
            hic nam debitis praesentium ea quo consequuntur ratione dolorem
            necessitatibus? Blanditiis et aliquam sequi adipisci. Praesentium */}
            {/* vitae quam placeat. Ad omnis soluta mollitia odit optio eligendi
            voluptas exercitationem nobis, adipisci consequatur! Sed dictaum,
            accusamus hic nam debitis praesentium ea quo consequuntur ratione
            dolorem necessitatibus? Blanditiis et aliquam sequi adipisci.
            Praesentium vitae quam placeat. Ad omnis soluta mollitia odit optio
            eligendi voluptas exercitationem nobis, adipisci consequatur! Sed */}
            dicta
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBlog;
