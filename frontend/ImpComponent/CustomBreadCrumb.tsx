import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CustomBreadCrumb = ({ items }: { items: Array<{ href?: string; label: string }> }) => {
  return (
    <nav aria-label="breadcrumb">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <div key={`${index}-${item.label}`} className="inline-flex items-center">
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : (
                  <span className="text-gray-500">{item.label}</span>
                )}
              </BreadcrumbItem>

              {/* Add separator except for last item */}
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default CustomBreadCrumb;
